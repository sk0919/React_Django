import React from 'react'

function UpdateEntry() {
    return (
        <div>
            <form>
                <div className="form-row"> 

                    <div className="form-group col-md-7">
                        <input type="text" className="form-control" name="watch" value="" placeholder="watch" />
                    </div>

                    <div className="form-group col-md-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                         <input type="text" className="form-control" id="price0" placeholder="Price (optional)" />
                        </div>  
                    </div>

                    <div className="form-group col-md-2">
                        <button type="submit" className="btn btn-primary" onClick="#"><i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i> Update</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UpdateEntry
